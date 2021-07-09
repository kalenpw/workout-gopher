<template>
    <category-picker
        :categories="sheets"
        :currentCategory="currentSheet"
        @category-updated="updateSelectedCategory"
    />
    <template v-if="sheetData[currentSheet]">
        <div v-for="(value, name) in sheetData[currentSheet]" :key="name">
            <GraphWrapper :name="name" :workouts="value" />
        </div>
    </template>
    <div v-else>
        <h1>Loading graphs</h1>
    </div>
</template>

<script>
import { initGoogleAPI, getSheetData } from "../helpers/google-sheets.js";
import CategoryPicker from "./CategoryPicker.vue";
import GraphWrapper from "./GraphWrapper.vue";

const SHEETS = ["Legs", "Arms", "Chest", "Shoulders", "Back"];

export default {
    name: "Graphs",
    components: {
        CategoryPicker,
        GraphWrapper,
    },
    data() {
        return {
            sheetData: {},
            sheets: SHEETS,
            currentSheet: SHEETS[0],
        };
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
            if (!this.sheetData[value]) {
                getSheetData(value, this.updateSheetData);
            }
        },
    },
};
</script>