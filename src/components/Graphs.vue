<template>
    <category-picker
        :categories="sheets"
        :currentCategory="currentSheet"
        @category-updated="updateSelectedCategory"
    />
    <template v-if="sheetData[currentSheet]">
        <div v-for="(value, name) in visibleGraphs" :key="name" class="mb-5">
            <GraphWrapper :name="name" :workouts="value" />
        </div>
        <div
            v-if="amountToShow < maxGraphsOfCurrentCategory"
            class="d-flex my-5 justify-content-center"
        >
            <button class="btn" @click="loadMoreGraphs">Load more</button>
        </div>
    </template>
    <div v-else class="d-flex justify-content-center">
        <LoadingSpinner />
    </div>
</template>

<script>
import { initGoogleAPI, getSheetData } from "../helpers/google-sheets.js";
import CategoryPicker from "./CategoryPicker.vue";
import GraphWrapper from "./GraphWrapper.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

// names of sheets in Google Sheets - required to fetch info
const SHEETS = ["Legs", "Arms", "Chest", "Shoulders", "Back"];

export default {
    name: "Graphs",
    components: {
        CategoryPicker,
        GraphWrapper,
        LoadingSpinner,
    },
    data() {
        return {
            sheetData: {},
            sheets: SHEETS,
            currentSheet: SHEETS[0],
            amountToShow: 4,
        };
    },
    computed: {
        visibleGraphs() {
            if (this.amountToShow >= this.maxGraphsOfCurrentCategory) {
                return this.sheetData[this.currentSheet];
            }

            let index = 0;
            let visible = {};

            for (const [key, value] of Object.entries(
                this.sheetData[this.currentSheet]
            )) {
                if (index >= this.amountToShow) {
                    return visible;
                }
                if (!visible[key]) {
                    visible[key] = [];
                }
                visible[key] = value;
                index++;
            }
            return visible;
        },
        maxGraphsOfCurrentCategory() {
            if (!this.sheetData[this.currentSheet]) {
                return 0;
            }
            return Object.keys(this.sheetData[this.currentSheet]).length;
        },
    },
    mounted() {
        initGoogleAPI(() => {
            getSheetData("Legs", this.updateSheetData);
        });
    },
    methods: {
        updateSheetData(value) {
            this.sheetData[this.currentSheet] = value;
        },
        updateSelectedCategory(value) {
            this.currentSheet = value;
            this.amountToShow = 4;
            if (!this.sheetData[value]) {
                getSheetData(value, this.updateSheetData);
            }
        },
        loadMoreGraphs() {
            let tentative = (this.amountToShow += 2);
            if (tentative > this.maxGraphsOfCurrentCategory) {
                tentative = this.maxGraphsOfCurrentCategory;
            }
            this.amountToShow = tentative;
        },
    },
};
</script>

<style scoped>
.btn {
    background-color: #c89933 !important;
    color: white;
    transition: background-color 0.2s;
}
.btn:hover {
    background-color: #cfa345 !important;
    color: white;
}
</style>