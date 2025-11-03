import { NextResponse } from 'next/server'; // <-- Import NextResponse
import dbConnect from '../../../lib/dbConnect';
import Habit from '../../../models/Habit';

export async function GET(request) { // <-- Separate GET function
  await dbConnect();

  try {
    const habits = await Habit.find({});
    return NextResponse.json({ success: true, data: habits }, { status: 200 }); // <-- Uses NextResponse
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request) { // <-- Separate POST function
  await dbConnect();

  try {
    const body = await request.json(); // <-- Get body with request.json()
    const habit = await Habit.create(body);
    return NextResponse.json({ success: true, data: habit }, { status: 201 }); // <-- Uses NextResponse
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}