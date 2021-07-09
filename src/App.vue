<template>
    <Navbar />
    <div class="container">
        <Graphs />
        <!-- <TestGraph /> -->
        <!-- <TestGraph2/> -->
    </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Graphs from "./components/Graphs.vue";
import TestGraph from "./components/TestGraph.vue";
import TestGraph2 from "./components/TestGraph2.vue";

export default {
    name: "App",
    components: {
        Navbar,
        Graphs,
        TestGraph,
        TestGraph2,
    },
    mounted() {},
};
</script>
