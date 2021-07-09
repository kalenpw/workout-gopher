<template>
    <Navbar />
    <div class="container">
        <Graphs />
    </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Graphs from "./components/Graphs.vue";

export default {
    name: "App",
    components: {
        Navbar,
        Graphs,
    },
    mounted() {},
};
</script>
