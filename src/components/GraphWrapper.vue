<template>
    <h2>{{ name }}</h2>
    <div :id="nameID"></div>
</template>

<script>
import { yyyyMmDdToEpoch } from "../helpers/date.js";
import { nameFormattedForID } from "../helpers/html.js";
import { defineComponent, onMounted } from "vue";
import ApexChart from "apexcharts";

export default defineComponent({
    props: ["name", "workouts"],
    computed: {
        nameID(props) {
            return nameFormattedForID(props.name);
        },
    },
    setup(props) {
        let chartInstance;

        const options = {
            colors: ["#694966"],
            chart: {
                id: props.name,
                height: 350,
                type: "scatter",
                zoom: {
                    enabled: true,
                },
                toolbar: {
                    show: true,
                },
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
            },
            xaxis: {
                type: "datetime",
                labels: {
                    datetimeFormatter: {
                        year: "yyyy-MM-dd",
                        month: "yyyy-MM-dd",
                        day: "yyyy-MM-dd",
                        hour: "yyyy-MM-dd",
                    },
                },
            },
        };

        const getChartData = () => {
            let data = [];
            for (let workout of props.workouts) {
                for (let set of workout.sets) {
                    data.push([yyyyMmDdToEpoch(workout.date), set.weight]);
                }
            }

            return [
                {
                    name: "Weight",
                    data: data,
                },
            ];
        };

        onMounted(() => {
            chartInstance = new ApexChart(
                document.querySelector(`#${nameFormattedForID(props.name)}`),
                {
                    ...options,
                    series: getChartData(),
                }
            );
            chartInstance.render();
        });
    },
});
</script>

<style scoped>
h2 {
    text-transform: capitalize;
}
</style>