<template>
    <div class="d-flex justify-content-center">
        <ul class="nav nav-pills card-header-pills mx-0 mx-md-4 my-2 mb-4 my-md-4 pb-1">
            <li
                class="nav-item px-1"
                v-for="category in categories"
                :key="category"
                @click="categoryClicked(category)"
            >
                <span
                    class="nav-link"
                    :class="category == currentCategory ? 'active' : ''"
                >
                    {{ category }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "CategoryPicker",
    props: {
        categories: [],
        currentCategory: String,
    },
    methods: {
        categoryClicked(value) {
            this.$emit("categoryUpdated", value);
        },
    },
};
</script>

<style scoped>
.nav {
    width: max-content;
    border-bottom: 1px solid #ccc;
}
.nav-link {
    color: #694966;
    transition: background 0.4s;
}
.nav-link:hover {
    color: #5c415d;
    background: rgba(116, 82, 108, 0.2);
    cursor: pointer;
}

.nav-link.active {
    background-color: #c89933 !important;
}
.nav-link.active {
    cursor: default;
}
</style>