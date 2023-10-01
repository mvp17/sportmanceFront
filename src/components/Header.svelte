<script>
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/settings' ? 'page' : undefined}>
				<a href="/settings">Settings</a>
			</li>
			<li aria-current={$page.url.pathname === '/dashboard' ? 'page' : undefined}>
				<a href="/dashboard">Dashboard</a>
			</li>
			<li aria-current={$page.url.pathname === '/dataAnalytics' ? 'page' : undefined}>
				<a href="/dataAnalytics">Data Analytics</a>
			</li>
      <li aria-current={$page.url.pathname === '/dataInput' ? 'page' : undefined}>
				<a href="/dataInput">Data Input</a>
			</li>
			<li aria-current={$page.url.pathname === '/account' ? 'page' : undefined}>
				<a href="/account">Account</a>
			</li>
			
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
  <nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
      <li aria-current={$page.url.pathname === '/signup' ? 'page' : undefined}>
				<a href="/signup">Sign up</a>
			</li>
      <li aria-current={$page.url.pathname === '/signin' ? 'page' : undefined}>
				<a href="/signin">Sign in</a>
			</li>
      <li aria-current={$page.url.pathname === '/signout' ? 'page' : undefined}>
				<a href="/signout">Sign out</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: center;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>

<!--
<Navbar let:hidden let:toggle fluid={false} rounded={true}>
	<NavHamburger on:click={toggle} />
	<NavUl {activeUrl} {hidden}>
		<NavLi href="/">Home</NavLi>
		<NavLi class="cursor-pointer">
      Profile<ChevronDownOutline class="w-3 h-3 ml-2 text-primary-800 dark:text-white inline" />
    </NavLi>
    <Dropdown class="w-44 z-20">
      <DropdownItem href="/signup">Sign Up</DropdownItem>
      <DropdownItem href="/signin">Sign In</DropdownItem>
      <DropdownItem href="/account">Account</DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/signout">Sign out</DropdownItem>
    </Dropdown>
		<NavLi class="cursor-pointer">
      Data<ChevronDownOutline class="w-3 h-3 ml-2 text-primary-800 dark:text-white inline" />
    </NavLi>
    <Dropdown class="w-44 z-20">
      <DropdownItem href="/dataInput">Input</DropdownItem>
      <DropdownItem href="/dataAnalytics">Analytics</DropdownItem>
    </Dropdown>
		<NavLi href="/settings">Settings</NavLi>
		<NavLi href="/dashboard">Dashboard</NavLi>
	</NavUl>
</Navbar>
-->