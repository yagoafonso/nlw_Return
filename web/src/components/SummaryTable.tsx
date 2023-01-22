import { generateDatesFromYearBeginning } from "../utils/generate-range-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = [
  'D',
  'S',
  'T',
  'Q',
  'Q',
  'S',
  'S',
]

const summaryDates =generateDatesFromYearBeginning()

export function Summarytable() {
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, indice) => {
          return (
            <div 
              key={`${weekDay}-${indice}`} 
              className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center"
            >
              {weekDay}
            </div>
          )
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map(date => {
          return <HabitDay key={date.toString()} />
        })}
      </div>      
    </div>
  );
}