<script>
	import { findInFragments } from "$lib";
	import { ChevronLeft, ChevronRight, Icon } from "svelte-hero-icons";

  let {
    fragmentIndex = $bindable(0),
    fragments = []
  } = $props()

  let searchValue = $state('')
  let prevResult = $derived(runSearch(searchValue, fragmentIndex - 1, true))
  let nextResult = $derived(runSearch(searchValue, fragmentIndex + 1))

  /**
   * @param {string} search
   * @param {number} start
   * @param {boolean} reverse
   */
  function runSearch(search, start, reverse=false) {
    if (!search || search.length < 3) {
      return false
    }
    return findInFragments(fragments, search, start, reverse)
  }

  /**
   * update fragmentIndex to the provided search result, if it's valid
   * @param {number|boolean} idx
   */
  function gotoResult(idx) {
    if (idx !== false) {
      fragmentIndex = Number(idx)
    }
  }
</script>

{#snippet searchNav(idx, icon)}
  <button
    class="btn btn-sm join-item"
    disabled={idx === false}
    onclick={() => gotoResult(idx)}>
    <Icon src={icon} size="12" />
  </button>
{/snippet}

<div class="flex flex-row-reverse items-center gap-4">
  <div class="join">
    <div>
      <label class="input input-sm join-item">
        <input type="search" placeholder="Search" bind:value={searchValue} />
      </label>
    </div>
    {@render searchNav(prevResult, ChevronLeft)}
    {@render searchNav(nextResult, ChevronRight)}
  </div>
  
</div>