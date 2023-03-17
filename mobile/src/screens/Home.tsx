import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { generateDatesFromYearBeginning } from "../utils/generate-range-from-year-beginning";

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

export function Home() {

  const { navigate } = useNavigation();
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {
          weekDays.map((weekDay, indice) => (
            <Text
              key={`${weekDay}-${indice}`}
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{ width: DAY_SIZE }}
            >
              {weekDay}
            </Text>
          ))
        }
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        <View className="flex-row flex-wrap">
          {
            datesFromYearStart.map(date => (
              <HabitDay
                key={date.toISOString()}
                onPress={() => navigate('habit', { date: date.toISOString() })}
              />
            ))
          }

          {
            amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, indice) => (
              <View
                key={indice}
                className="bg-zinc-400 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))
          }
        </View>
      </ScrollView>
    </View>
  );
}