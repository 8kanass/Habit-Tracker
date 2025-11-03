import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Habit from '../../../../models/Habit';

export async function GET(request, { params }) {
  await dbConnect();
  
  // v-- THIS IS THE FIX --v
  // We must await params because it can be a Promise
  const { id } = await params; 
  // ^-- THIS IS THE FIX --^

  try {
    const habit = await Habit.findById(id);
    if (!habit) {
      return NextResponse.json({ success: false, message: "Habit not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: habit }, { status: 200 });
  } catch (error) {
    // This catches errors like an invalid ID format
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();

  // v-- THIS IS THE FIX --v
  // We must await params because it can be a Promise
  const { id } = await params;
  // ^-- THIS IS THE FIX --^

  try {
    const body = await request.json();
    const { didDoIt } = body;

    const newLog = {
      timestamp: new Date(),
      didDoIt: didDoIt,
    };

    const habit = await Habit.findByIdAndUpdate(
      id,
      { $push: { logs: newLog } },
      { new: true, runValidators: true }
    );

    if (!habit) {
      // This will now correctly trigger if the ID is valid but not in the DB
      return NextResponse.json({ success: false, message: "Habit not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: habit }, { status: 200 });
  } catch (error) {
    // This catches errors like invalid ID format or bad request body
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  
  const { id } = await params;

  try {
    const habit = await Habit.findByIdAndDelete(id);
    
    if (!habit) {
      return NextResponse.json({ success: false, message: "Habit not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: habit }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}