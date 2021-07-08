<template>
    <category-picker
        :categories="sheets"
        :currentCategory="currentSheet"
        @category-updated="updateSelectedCategory"
    />
    <h1>This will be graphs</h1>
    {{ sheetData[currentSheet] }}
</template>

<script>
import { initGoogleAPI, getSheetData } from "../helpers/google-sheets.js";
import CategoryPicker from "./CategoryPicker.vue";

const SHEETS = ["Legs", "Arms", "Chest", "Shoulders", "Back"];

export default {
    name: "Graphs",
    components: {
        CategoryPicker,
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
            getSheetData("Legs", this.updateState);
        });
    },
    methods: {
        updateState(value) {
            this.sheetData[this.currentSheet] = value;
        },
        updateSelectedCategory(value) {
            this.currentSheet = value;
            if (!this.sheetData[value]) {
                getSheetData(value, this.updateState);
            }
        },
    },
};
</script>