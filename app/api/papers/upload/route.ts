import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const subject = formData.get('subject') as string;
    const school = formData.get('school') as string;
    const year = formData.get('year') as string;
    const description = formData.get('description') as string;

    if (!file || !title || !subject || !school || !year) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the user from the auth token
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Upload file to Supabase Storage
    const fileName = `${Date.now()}-${file.name}`;
    const fileBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from('exam-papers')
      .upload(`papers/${fileName}`, fileBuffer, {
        contentType: file.type,
      });

    if (uploadError) throw uploadError;

    // Save metadata to database
    const { data, error } = await supabase
      .from('papers')
      .insert([
        {
          title,
          subject,
          school,
          year,
          description,
          file_url: fileName,
          file_size: file.size,
          file_type: file.type,
          uploaded_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
