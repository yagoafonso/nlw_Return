import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from "./Progressbar";
// interface HabitProps {
//   completed: number
// }

export function HabitDay() {
  return (
    <Popover.Root>
      <Popover.Trigger className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg" />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="semi-bold text-zinc-400">Sábado</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">04/02</span>
          <Popover.Arrow  height={8} width={16} className="fill-zinc-900"/>

          <ProgressBar progress={10}/>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}