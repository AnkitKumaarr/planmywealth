import mysql from '@/utils/db.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Example query
    const results = await mysql.query('SELECT * FROM your_table')
    await mysql.end()
    return NextResponse.json({ data: results })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    // Example insert query
    const result = await mysql.query(
      'INSERT INTO your_table (column1, column2) VALUES (?, ?)',
      [body.value1, body.value2]
    )
    await mysql.end()
    return NextResponse.json({ success: true, id: result.insertId })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
} 