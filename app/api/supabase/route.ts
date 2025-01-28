import { NextResponse } from 'next/server';
import { supabase } from '../../ui/supabaseClient';

export async function POST(request: Request) {
    const { phone, userMessage, assistantMessage } = await request.json();

    // Fetch the user's current messages
    const { data: user, error } = await supabase
        .from('Users')
        .select('messages')
        .eq('phone', phone)
        .single();

    if (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
    }

    const updatedMessages = [...user.messages, userMessage, assistantMessage];

    // Update the user's messages in Supabase
    const { error: updateError } = await supabase
        .from('Users')
        .update({ messages: updatedMessages })
        .eq('phone', phone);

    if (updateError) {
        console.error('Error updating messages:', updateError);
        return NextResponse.json({ error: 'Error updating messages' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Messages updated successfully' });
}