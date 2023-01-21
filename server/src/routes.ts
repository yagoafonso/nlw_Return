import dayjs from 'dayjs'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export async function appRoutes(app: FastifyInstance){
  //ROTA PARA CRIAR UMA UM NOVO HÁBITO
  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(
        z.number().min(0).max(6)
      ),
    })

    const { title, weekDays } = createHabitBody.parse(request.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay,
            }
          }),
        }
      }
    })
  })

  // ROTA PARA RETORNAR DETALHE DO DIA
  app.get('/day', async (request) =>{
    const getDayParams = z.object({
      date: z.coerce.date(),
    })


    const { date } = getDayParams.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')
    const  weekDay = parsedDate.get('day')

    // PEGAR TODOS OS HÁBITOS PÓSSIVEIS
    // HÁBITOS QUE JÁ FORAM COMPLETADOS

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          }
        }
      },
    })

    const day = await prisma.day.findFirst({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      }
    })

    const completeHabits = day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id
    }) ?? []

    return {
      possibleHabits,
      completeHabits
    }
  })
}
