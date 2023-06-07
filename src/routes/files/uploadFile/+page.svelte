<script>
    let messages = [];
</script>
  
{#if messages.length !== 0}
    <div class="container" style="margin-top: 30px">
        <div class="form-group" style="margin: 25px 20px">
            <ul class="messages">
                {#each messages as message}
                    <p> <h5 class="alert alert-danger">{message}</h5>
                {/each}
            </ul>
        </div>
    </div>
{:else}
<!--form upload file-->
{/if}
