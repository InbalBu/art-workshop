/**
 * Supabase Edge Function - Send Registration Emails
 *
 * This function is triggered when a new registration is created.
 * It sends:
 * 1. Confirmation email to the user
 * 2. Notification email to the admin
 *
 * To deploy:
 * 1. Install Supabase CLI: npm install -g supabase
 * 2. Login: supabase login
 * 3. Link project: supabase link --project-ref bqmniajtjpsnblpidcxi
 * 4. Deploy: supabase functions deploy send-registration-email
 *
 * Set secrets:
 * supabase secrets set RESEND_API_KEY=your_resend_api_key
 * supabase secrets set ADMIN_EMAIL=admin@example.com
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Email templates in Hebrew
const userEmailTemplate = (name: string, sessionInfo: string | null) => ({
  subject: 'קיבלנו את ההרשמה שלך! 🎨',
  html: `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #4A423A; font-size: 24px;">שלום ${name}!</h1>

      <p style="color: #6B635B; font-size: 16px; line-height: 1.8;">
        תודה שנרשמת לסדנה! קיבלנו את הפרטים שלך ונחזור אליך בהקדם לתיאום.
      </p>

      ${sessionInfo ? `
        <div style="background: #FDF8F3; border-radius: 12px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #4A423A; margin-top: 0;">פרטי הסדנה:</h3>
          <p style="color: #6B635B; margin: 0;">${sessionInfo}</p>
        </div>
      ` : `
        <p style="color: #6B635B; font-size: 16px; line-height: 1.8;">
          ניצור איתך קשר בקרוב לתיאום מועד מתאים.
        </p>
      `}

      <p style="color: #6B635B; font-size: 16px; line-height: 1.8;">
        אם יש לך שאלות, אפשר להשיב למייל הזה.
      </p>

      <p style="color: #C4907C; font-size: 16px; margin-top: 30px;">
        נתראה בסדנה! ✨
      </p>

      <hr style="border: none; border-top: 1px solid #F5EDE4; margin: 30px 0;" />

      <p style="color: #8C857D; font-size: 12px;">
        סדנאות יצירה
      </p>
    </div>
  `,
})

const adminEmailTemplate = (
  name: string,
  email: string,
  message: string | null,
  sessionInfo: string | null
) => ({
  subject: `הרשמה חדשה: ${name}`,
  html: `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #4A423A; font-size: 24px;">הרשמה חדשה!</h1>

      <div style="background: #FDF8F3; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <h3 style="color: #4A423A; margin-top: 0;">פרטי הנרשם:</h3>
        <p style="color: #6B635B; margin: 5px 0;"><strong>שם:</strong> ${name}</p>
        <p style="color: #6B635B; margin: 5px 0;"><strong>אימייל:</strong> <a href="mailto:${email}">${email}</a></p>
        ${sessionInfo ? `<p style="color: #6B635B; margin: 5px 0;"><strong>סדנה:</strong> ${sessionInfo}</p>` : ''}
        ${message ? `<p style="color: #6B635B; margin: 5px 0;"><strong>הערות:</strong> ${message}</p>` : ''}
      </div>

      <p style="color: #6B635B; font-size: 14px;">
        <a href="https://your-site.com/admin" style="color: #C4907C;">צפייה בכל ההרשמות →</a>
      </p>
    </div>
  `,
})

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, message, sessionInfo } = await req.json()

    // Get secrets
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'info@workshop.co.il'

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured')
    }

    // Send email to user
    const userEmail = userEmailTemplate(name, sessionInfo)
    const userResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'סדנאות יצירה <onboarding@resend.dev>',
        to: email,
        subject: userEmail.subject,
        html: userEmail.html,
      }),
    })

    if (!userResponse.ok) {
      console.error('Failed to send user email:', await userResponse.text())
    }

    // Send email to admin
    const adminEmail = adminEmailTemplate(name, email, message, sessionInfo)
    const adminResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'סדנאות יצירה <onboarding@resend.dev>',
        to: ADMIN_EMAIL,
        subject: adminEmail.subject,
        html: adminEmail.html,
      }),
    })

    if (!adminResponse.ok) {
      console.error('Failed to send admin email:', await adminResponse.text())
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error sending emails:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
