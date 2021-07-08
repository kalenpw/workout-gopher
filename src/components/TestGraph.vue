<template>
    <div id="wrapper">
        <div id="chart-line2">
            <apexchart
                type="line"
                height="230"
                :options="primaryOptions"
                :series="primarySeries"
            ></apexchart>
        </div>
        <div id="chart-line">
            <apexchart
                type="line"
                height="100"
                :options="mapOptions"
                :series="mapSeries"
            ></apexchart>
        </div>
    </div>
</template>
 
<script>
export default {
    name: "TestGraph",
    data: function () {
        let data = [
            [1327532400000, 135],
            [1327532400000, 155],
            [1327618800000, 135],
            [1327964400000, 155],
            [1328223600000, 165],
            [1328569200000, 150],
            [1328742000000, 180],
            [1330383600000, 145],
            [1330483600000, 145],
            [1330583600000, 145],
            [1330883600000, 145],
            [1331083600000, 145],
            [1331183600000, 145],
            [1331283600000, 145],
        ];

        return {
            primaryOptions: {
                chart: {
                    id: "chart2",
                    type: "line",
                    height: 230,
                    toolbar: {
                        autoSelected: "pan",
                        show: false,
                    },
                },
                colors: ["#546E7A"],

                dataLabels: {
                    enabled: false,
                },
                fill: {
                    opacity: 1,
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
                title: {
                    text: "Dummy",
                    align: "center",
                },
            },
            // end primary options
            mapOptions: {
                chart: {
                    id: "chart1",
                    height: 130,
                    type: "area",
                    brush: {
                        target: "chart2",
                        enabled: true,
                    },
                    selection: {
                        enabled: true,
                        xaxis: {
                            min: new Date("24 Jan 2012").getTime(),
                            max: new Date("10 Mar 2012").getTime(),
                        },
                    },
                },
                colors: ["#008FFB"],

                xaxis: {
                    type: "datetime",
                    tooltip: {
                        enabled: false,
                    },
                },
                yaxis: {
                    tickAmount: 2,
                },
            },
            primarySeries: [
                {
                    data: data,
                },
            ],
            mapSeries: [
                {
                    data: data,
                },
            ],
        };
    },
};
</script>