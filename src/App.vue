<template>
    <Navbar />
    <div class="container">
        <Graphs />
        <!-- <TestGraph /> -->
    </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Graphs from "./components/Graphs.vue";
import TestGraph from "./components/TestGraph.vue";

export default {
    name: "App",
    components: {
        Navbar,
        Graphs,
        TestGraph,
    },
    mounted() {},
};
</script>
