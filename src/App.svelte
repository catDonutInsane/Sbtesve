<script lang="ts">
  import { onMount } from "svelte";
  import type { ResultType } from "./types";
  import Select from "./lib/select.svelte";
  import { data, data2, rate1, rate2, input1, input2 } from "./stores";

  //при первой загрузке берём данные по рублям
  onMount(() => {
    fetch(`https://open.er-api.com/v6/latest/RUB`, { method: "GET" })
      .then((res: Response): Promise<ResultType> => res.json())
      .then((res) => {
        data.update((n) => {
          n = res;
          return n;
        });
        data2.update((n) => {
          n = res;
          return n;
        });
      });
  });
  //рассчитываем значения второго инпута
  function updateInput1(): void {
    if ($data.rates[$rate1] !== undefined) {
      let inputValue: number = +$input1;
      let rateValue: number = Number($data.rates[$rate1]);
      $input2 = (
        (inputValue * Number($data.rates[$rate2])) /
        rateValue
      ).toString();
    }
  }
  //рассчитываем значения первого инпута
  function updateInput2() {
    if ($data2.rates[$rate2] !== undefined) {
      let inputValue: number = +$input2;
      let rateValue: number = Number($data2.rates[$rate2]);
      $input1 = (
        (inputValue * Number($data2.rates[$rate1])) /
        rateValue
      ).toString();
    }
  }
</script>

<input type="text" bind:value={$input1} on:input={updateInput1} />
<Select num={1} rate={$rate1} f={updateInput1} />
<input type="text" bind:value={$input2} on:input={updateInput2} />
<Select num={2} rate={$rate2} f={updateInput2} />
