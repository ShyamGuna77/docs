// app/api/feedback/route.js (or pages/api/feedback.js for Pages Router)
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { happiness, feedback } = await request.json();

    // Map happiness level to emoji and description
    const happinessMap = {
      4: { emoji: "😂", description: "Very Happy" },
      3: { emoji: "😊", description: "Happy" },
      2: { emoji: "😞", description: "Unhappy" },
      1: { emoji: "😠", description: "Very Unhappy" },
    };

    const happinessData = happinessMap[happiness as keyof typeof happinessMap] || {
      emoji: "❓",
      description: "Unknown",
    };

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // Replace with your verified domain
      to: ["gshyamprasad2001@gmail.com"], // Your email where you want to receive feedback
      subject: `New Feedback: ${happinessData.description} ${happinessData.emoji}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            New Feedback Received ${happinessData.emoji}
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #555;">Happiness Level:</h3>
            <p style="font-size: 18px; margin: 0;">
              ${happinessData.description} (${happiness}/4) ${happinessData.emoji}
            </p>
          </div>
          
          ${
            feedback
              ? `
            <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; border-left: 4px solid #007acc;">
              <h3 style="margin-top: 0; color: #555;">Feedback Message:</h3>
              <p style="font-size: 16px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${feedback}</p>
            </div>
          `
              : ""
          }
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Received:</strong> ${new Date().toLocaleString()}<br>
              <strong>Source:</strong> Blog Feedback Form
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Failed to send feedback" },
        { status: 500 }
      );
    }

    return Response.json({ success: true, id: data.id });
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}


