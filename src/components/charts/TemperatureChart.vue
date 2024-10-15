<template>
  <div>
    <button @click="setMode('daily')">1 день (24 часа)</button>
    <button @click="setMode('5day')">5 дней</button>

    <canvas id="weatherChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Chart } from 'chart.js/auto';
import axios from 'axios';

const props = defineProps<{
  currentCity: {}
}>();

const chartRef = ref<Chart | null>(null);
const mode = ref<'daily' | '5day'>('daily');
const weatherData = ref<any[]>([]);
const city = props.currentCity.name;

const setMode = (newMode: 'daily' | '5day') => {
  mode.value = newMode;
};

const fetchWeatherData = async () => {
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_KEY;
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  const { data } = await axios.get(url);

  if (mode.value === 'daily') {
    weatherData.value = data.list.slice(0, 8);
  } else {
    weatherData.value = data.list.filter((el, id) => id % 8 === 0);
  }

  renderChart();
};

const renderChart = () => {
  if (chartRef.value) {
    chartRef.value.destroy();
  }

  const labels = weatherData.value.map(item => {
    const date = new Date(item.dt * 1000);
    return mode.value === 'daily'
      ? `${date.getHours()}:00`
      : date.toLocaleDateString();
  });

  const temperatures = weatherData.value.map(item => item.main.temp);

  const ctx = (document.getElementById('weatherChart') as HTMLCanvasElement).getContext('2d');
  chartRef.value = new Chart(ctx!, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Температура (°C)',
        data: temperatures,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value) {
              return `${value}°C`;
            }
          }
        }
      }
    }
  });
};

watch(mode, fetchWeatherData);

onMounted(fetchWeatherData);
</script>

<style scoped>
canvas {
  max-width: 100%;
}
</style>
