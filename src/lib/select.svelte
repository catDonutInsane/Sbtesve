<script lang="ts">
  import type { RateType, ResultType } from "../types";
  import { data, data2, rate1, rate2 } from "../stores.ts";
  export let num: number;
  export let rate: RateType;
  export let f: () => void;

  let val = [
    { id: 1, text: `RUB` },
    { id: 2, text: `USD` },
    { id: 3, text: `EUR` },
  ];
  //получаем курсы относительно выбранной валюты
  let getData = async ($rate: RateType) => {
    let res = await fetch(`https://open.er-api.com/v6/latest/${$rate}`, {
      method: "GET",
    })
      .then((res: Response): Promise<ResultType> => res.json())
      .then((res) => res.rates);
    return res;
  };
  //устанавливаем курсы при изменении валюты
  let setData = () => {
    getData(rate).then((res) => {
      if (num == 1) {
        data.update((n) => {
          n.rates = res;
          return n;
        });

        rate1.set(rate);
        //перерасчитываем курсы при смене валюты
        f();
      } else if (num == 2) {
        data2.update((n) => {
          n.rates = res;
          return n;
        });
        rate2.set(rate);
        f();
      }
    });
  };
</script>

<select bind:value={rate} on:change={() => setData()}>
  {#each val as vals}
    <option value={vals.text}>
      {vals.text}
    </option>
  {/each}
</select>
