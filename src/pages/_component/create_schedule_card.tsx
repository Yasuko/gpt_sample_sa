import React from "react";

/**
 * CreateScheduleCard
 * Figmaデザイン「create schedule card」準拠
 * Tailwind CSS使用
 * Menu calender, add people, my schedule btn, bgも含む
 */
const people = [
  {
    name: "Anton Tkacheve",
    email: "tkacheveanton@gmail.com",
    color: "bg-cyan-400/20",
    ring: "ring-cyan-400",
  },
  {
    name: "Alexey Stave",
    email: "alexeyst@gmail.com",
    color: "bg-fuchsia-400/20",
    ring: "ring-fuchsia-400",
  },
  {
    name: "Eddie Lobanovskiy",
    email: "laboanovskiy@gmail.com",
    color: "bg-indigo-200",
    ring: "ring-indigo-200",
  },
];

const miniCalendarDays = [
  ["27", "28", "29", "30", "31", "1", "2"],
  ["3", "4", "5", "6", "7", "8", "9"],
  ["10", "11", "12", "13", "14", "15", "16"],
  ["17", "18", "19", "20", "21", "22", "23"],
  ["24", "25", "26", "27", "28", "29", "30"],
];
const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const CreateScheduleCard = () => {
  return (
    <div className="w-full max-w-sm rounded-lg bg-white shadow p-0 flex flex-col overflow-hidden">
      {/* bg（背景） */}
      <div className="bg-gradient-to-br from-indigo-50 to-white p-6 flex flex-col gap-4">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-900">People</span>
          {/* my schedule btn */}
          <button className="px-4 py-2 rounded-lg border border-indigo-400/10 text-indigo-500 text-sm font-semibold hover:bg-indigo-50 transition">My Schedule</button>
        </div>
        {/* add people（検索） */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="text-gray-400"><circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor"/><path d="M13 13L11 11" stroke="currentColor" strokeLinecap="round"/></svg>
          <input className="bg-transparent outline-none text-sm flex-1" placeholder="Search for People" />
        </div>
        {/* add people（メンバーリスト） */}
        <div className="divide-y divide-gray-100">
          {people.map((p, i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <span className={`w-10 h-10 rounded-full ${p.color} ring-2 ${p.ring} flex-shrink-0`} />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{p.name}</div>
                <div className="text-xs text-gray-500">{p.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Menu calender（右側カレンダー） */}
      <div className="bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-700">December 2, 2021</span>
          <div className="flex gap-1">
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="text-gray-400"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="text-gray-400"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400">
          {weekDays.map((d) => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {miniCalendarDays.flat().map((d, i) => (
            <div key={i} className={`py-1 rounded ${d === "2" ? "bg-indigo-500 text-white font-bold" : "text-gray-700"}`}>{d}</div>
          ))}
        </div>
      </div>
      {/* スケジュール作成ボタン */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition">
          <span>Create Schedule</span>
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </div>
    </div>
  );
};

export default CreateScheduleCard;
