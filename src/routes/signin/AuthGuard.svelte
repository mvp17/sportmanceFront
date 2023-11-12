<script>
	import { jwt } from "../../stores/sessionStore";
</script>

{#if $jwt}
	<slot name="authed"></slot>
{:else}
	<slot name="not_authed"></slot>
{/if}