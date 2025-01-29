import { NextResponse } from "next/server";
import { supabase } from "../../ui/supabaseClient";

export async function POST(request: Request) {
  const { user_phone, rating, review, need_ai } = await request.json();
  try {
    const { error } = await supabase
      .from("ReviewsAndRatings")
      .insert([
        {
          rating: rating,
          review,
          user_phone,
          need_ai,
        },
      ])
      .select();

    if (error) {
      console.error("Error sending review:", error);
      return NextResponse.json(
        { error: "Error sending review" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Review and rating created successfully",
    });
  } catch (error) {
  } finally {
  }
}
