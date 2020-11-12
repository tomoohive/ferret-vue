<template lang="pug">
div.container-fluid
  div.row
    div.col-sm-8
      PentagonChart
    div.col-sm-4
      ImageUpload
div.container-fluid
  div.row
    InputClothesList
SendClothesData
</template>

<script>
import ImageUpload from "@/components/evaluate/ImageUpload.vue";
import InputClothesList from "@/components/evaluate/InputClothesList.vue";
import SendClothesData from "@/components/evaluate/SendClothesData.vue";
import PentagonChart from "@/components/evaluate/PentagonChart.vue";

export default {
  name: "EvaluateFashion",
  components: {
    PentagonChart,
    ImageUpload,
    InputClothesList,
    SendClothesData
  }
};
</script>
