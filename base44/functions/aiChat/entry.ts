import { createClientFromRequest } from 'npm:@base44/sdk@0.8.49';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string' || message.length > 2000) {
      return Response.json({ error: 'Invalid message' }, { status: 400 });
    }

    const systemPrompt = `You are an AI visa assistant for Trek Visa, a premium visa and nationality services agency based in Dublin, Ireland (CRO No. 123456.78).
You help clients with questions about:
- Visa applications for 130+ countries (Schengen, USA, UK, Canada, Japan, etc.)
- Document requirements and checklists
- Processing times and urgency options
- Nationality & residency programs (Standard $2,500, Premium $6,500, VIP $15,000)
- Travel insurance and add-on services
- Pricing and payment questions

Be professional, warm, concise, and helpful. Keep responses under 150 words.
If you don't know something specific about a particular case, direct the user to contact a human advisor via WhatsApp (+353 1 555 0194) or the in-app chat.
Always respond in the same language the user is writing in (French or English).
Never make up specific visa prices — direct users to the pricing calculator or visa application page for accurate quotes.`;

    const conversationHistory = (history || []).slice(-10).map(m => `${m.sender === 'client' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
    const prompt = `${systemPrompt}\n\nConversation history:\n${conversationHistory}\n\nUser: ${message}\n\nAssistant:`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
    });

    return Response.json({ reply: result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}