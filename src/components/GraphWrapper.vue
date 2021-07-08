<template>
    <h2>{{ name }}</h2>
    <div :id="name">
        <apexchart
            type="scatter"
            height="350"
            :options="chartOptions"
            :series="series"
        ></apexchart>
    </div>
</template>

<script>
import { yyyyMmDdToEpoch } from "../helpers/date.js";

export default {
    name: "GraphWrapper",
    props: {
        name: String,
        workouts: [],
    },
    mounted() {
        let data = [];
        for (let workout of this.workouts) {
            for (let set of workout.sets) {
                data.push([yyyyMmDdToEpoch(workout.date), set.weight]);
            }
            // data.push([yyyyMmDdToEpoch(workout.date), 100]);
        }

        this.series.push({
            name: "Desktops",
            data: data,
        });
    },
    data() {
        return {
            // populated in mounted()
            series: [],
            chartOptions: {
                chart: {
                    id: this.name,
                    height: 350,
                    type: "scatter",
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                colors: ["#694966"],
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: "straight",
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
            },
        };
    },
};
</script>

<style scoped>
h2 {
    text-transform: capitalize;
}
</style>