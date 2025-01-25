import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json();

    // Validate input
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Read existing users or create empty array
    let users = [];
    if (fs.existsSync(dataFile)) {
      const fileContent = fs.readFileSync(dataFile, 'utf-8');
      users = JSON.parse(fileContent);
    }

    // Add new user
    users.push({
      id: Date.now(),
      name,
      phone,
      registeredAt: new Date().toISOString(),
    });

    // Write back to file
    fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
