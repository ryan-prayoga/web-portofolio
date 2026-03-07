<script lang="ts">
	import { profile } from '$lib/data/profile';
	import { socials } from '$lib/data/socials';

	let heroRef: HTMLElement | undefined = $state();
	let isVisible = $state(false);
	let panelReady = $state(false);

	const pillars = [
		{
			label: 'Build',
			status: 'ACTIVE',
			description: 'Full-Stack Systems',
			color: 'accent-cyan',
			glow: 'glow-cyan'
		},
		{
			label: 'Lead',
			status: 'ACTIVE',
			description: 'Engineering Teams',
			color: 'accent-violet',
			glow: 'glow-violet'
		},
		{
			label: 'Deploy',
			status: 'ACTIVE',
			description: 'Production Ready',
			color: 'accent-success',
			glow: ''
		}
	];

	const microCards = [
		{ value: '4+', label: 'Years Experience', icon: 'briefcase' },
		{ value: 'Lead', label: 'Team Leader', icon: 'users' },
		{ value: '4', label: 'Team Members', icon: 'team' },
		{ value: 'Stg→Prod', label: 'Deployment', icon: 'rocket' },
		{ value: 'Multi', label: 'Stack', icon: 'layers' },
		{ value: 'AI', label: 'Assisted', icon: 'cpu' }
	];

	const githubSocial = socials.find((s) => s.name === 'GitHub');
	const linkedinSocial = socials.find((s) => s.name === 'LinkedIn');

	$effect(() => {
		const timeout = setTimeout(() => {
			isVisible = true;
		}, 100);
		const panelTimeout = setTimeout(() => {
			panelReady = true;
		}, 600);
		return () => {
			clearTimeout(timeout);
			clearTimeout(panelTimeout);
		};
	});
</script>

<section
	bind:this={heroRef}
	id="hero"
	class="relative min-h-screen overflow-hidden bg-base bg-grid pt-20 lg:pt-24"
>
	<!-- Background layers -->
	<div class="pointer-events-none absolute inset-0 spotlight-cyan"></div>
	<div
		class="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent-cyan/5 blur-[120px]"
	></div>
	<div
		class="pointer-events-none absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-accent-violet/5 blur-[100px]"
	></div>
	<div
		class="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-accent-blue/3 blur-[80px]"
	></div>

	<div class="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-10 lg:grid-cols-[1fr_420px] lg:gap-16 xl:gap-20">
			<!-- Left Column: Content -->
			<div
				class="flex flex-col gap-6 transition-all duration-700 {isVisible
					? 'translate-y-0 opacity-100'
					: 'translate-y-8 opacity-0'}"
			>
				<!-- Status badge -->
				<div class="flex items-center gap-2">
					<span
						class="relative flex h-2.5 w-2.5 items-center justify-center"
					>
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-success opacity-75"
						></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-accent-success"></span>
					</span>
					<span class="font-body text-sm tracking-wide text-accent-success">
						Available for opportunities
					</span>
				</div>

				<!-- Name -->
				<h1
					class="font-heading text-5xl leading-tight font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl"
				>
					{profile.name}
				</h1>

				<!-- Role with dot separators -->
				<div class="flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-base text-secondary sm:text-lg">
					{#each profile.role.split(' · ') as segment, i}
						{#if i > 0}
							<span class="text-accent-cyan/60">&#x2022;</span>
						{/if}
						<span>{segment}</span>
					{/each}
				</div>

				<!-- Tagline -->
				<p class="max-w-xl font-body text-lg leading-relaxed text-accent-cyan sm:text-xl">
					{profile.tagline}
				</p>

				<!-- Intro paragraph -->
				<p class="max-w-xl font-body text-base leading-relaxed text-secondary/90">
					{profile.intro}
				</p>

				<!-- CTA Buttons -->
				<div class="mt-2 flex flex-wrap items-center gap-3 sm:gap-4">
					<!-- Primary CTA -->
					<a
						href="#projects"
						class="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-accent-cyan px-6 py-3 font-heading text-sm font-semibold tracking-wide text-[#081120] transition-all duration-300 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)] sm:px-7 sm:py-3.5 sm:text-base"
					>
						<span class="relative z-10 flex items-center gap-2">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
								<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
							</svg>
							Lihat Project
						</span>
						<div class="absolute inset-0 -translate-x-full bg-accent-blue/30 transition-transform duration-300 group-hover:translate-x-0"></div>
					</a>

					<!-- Outline CTA -->
					<a
						href="#contact"
						style="color: #22d3ee; border-color: #22d3ee;"
						class="inline-flex items-center gap-2 rounded-lg border-2 px-6 py-2.5 font-heading text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_16px_rgba(34,211,238,0.25)] sm:px-7 sm:py-3 sm:text-base"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
							<polyline points="22,6 12,13 2,6"/>
						</svg>
						Hubungi Saya
					</a>

					<!-- Social Icon Links -->
					<div class="flex items-center gap-2">
						{#if githubSocial}
							<a
								href={githubSocial.url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub"
								class="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted transition-all duration-300 hover:border-border-light hover:text-primary hover:shadow-[0_0_12px_rgba(34,211,238,0.08)]"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
								</svg>
							</a>
						{/if}
						{#if linkedinSocial}
							<a
								href={linkedinSocial.url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn"
								class="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted transition-all duration-300 hover:border-border-light hover:text-primary hover:shadow-[0_0_12px_rgba(56,189,248,0.08)]"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
								</svg>
							</a>
						{/if}
					</div>
				</div>
			</div>

			<!-- Right Column: Engineering Command Panel -->
			<div
				class="transition-all duration-700 delay-300 {isVisible
					? 'translate-y-0 opacity-100'
					: 'translate-y-12 opacity-0'}"
			>
				<div class="glass rounded-2xl p-5 sm:p-6">
					<!-- Panel Header -->
					<div class="mb-5 flex items-center justify-between border-b border-border/60 pb-4">
						<div class="flex items-center gap-2.5">
							<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-cyan/10">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
									<line x1="8" y1="21" x2="16" y2="21"/>
									<line x1="12" y1="17" x2="12" y2="21"/>
								</svg>
							</div>
							<div>
								<p class="font-heading text-sm font-semibold tracking-wide text-primary">
									Command Panel
								</p>
								<p class="text-[11px] text-muted">System Overview</p>
							</div>
						</div>
						<div class="flex items-center gap-1.5">
							<span class="h-2 w-2 rounded-full bg-accent-success"></span>
							<span class="text-[11px] font-medium tracking-wider text-accent-success uppercase">
								Online
							</span>
						</div>
					</div>

					<!-- Three Main Pillars -->
					<div class="mb-4 grid grid-cols-3 gap-2.5">
						{#each pillars as pillar, i}
							<div
								class="group relative overflow-hidden rounded-xl border border-border/50 bg-surface/80 p-3 text-center transition-all duration-500 hover:border-{pillar.color}/30 {panelReady
									? 'translate-y-0 opacity-100'
									: 'translate-y-4 opacity-0'}"
								style="transition-delay: {i * 120}ms"
							>
								<!-- Status dot -->
								<div class="mb-2 flex items-center justify-center gap-1.5">
									<span class="relative flex h-1.5 w-1.5">
										{#if pillar.color === 'accent-cyan'}
											<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-60"></span>
											<span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan"></span>
										{:else if pillar.color === 'accent-violet'}
											<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-violet opacity-60"></span>
											<span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-violet"></span>
										{:else}
											<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-success opacity-60"></span>
											<span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-success"></span>
										{/if}
									</span>
									<span class="text-[10px] font-semibold tracking-widest text-muted uppercase">
										{pillar.status}
									</span>
								</div>
								<!-- Pillar label -->
								{#if pillar.color === 'accent-cyan'}
									<p class="font-heading text-lg font-bold text-accent-cyan">
										{pillar.label}
									</p>
								{:else if pillar.color === 'accent-violet'}
									<p class="font-heading text-lg font-bold text-accent-violet">
										{pillar.label}
									</p>
								{:else}
									<p class="font-heading text-lg font-bold text-accent-success">
										{pillar.label}
									</p>
								{/if}
								<!-- Description -->
								<p class="mt-1 text-[11px] leading-tight text-secondary">
									{pillar.description}
								</p>
							</div>
						{/each}
					</div>

					<!-- Divider with label -->
					<div class="mb-4 flex items-center gap-3">
						<div class="h-px flex-1 bg-border/60"></div>
						<span class="text-[10px] font-semibold tracking-[0.2em] text-muted uppercase">
							Metrics
						</span>
						<div class="h-px flex-1 bg-border/60"></div>
					</div>

					<!-- Micro Cards Grid -->
					<div class="grid grid-cols-3 gap-2">
						{#each microCards as card, i}
							<div
								class="rounded-lg border border-border/40 bg-surface-secondary/60 px-2.5 py-2.5 text-center transition-all duration-500 hover:border-border-light/60 hover:bg-surface-secondary {panelReady
									? 'translate-y-0 opacity-100'
									: 'translate-y-3 opacity-0'}"
								style="transition-delay: {400 + i * 80}ms"
							>
								<!-- Icon -->
								<div class="mx-auto mb-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-accent-cyan/8">
									{#if card.icon === 'briefcase'}
										<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
											<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
										</svg>
									{:else if card.icon === 'users'}
										<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-accent-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
											<circle cx="9" cy="7" r="4"/>
											<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
											<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
										</svg>
									{:else if card.icon === 'team'}
										<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-accent-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
											<circle cx="9" cy="7" r="4"/>
											<line x1="19" y1="8" x2="19" y2="14"/>
											<line x1="22" y1="11" x2="16" y2="11"/>
										</svg>
									{:else if card.icon === 'rocket'}
										<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-accent-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
											<path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
											<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
											<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
										</svg>
									{:else if card.icon === 'layers'}
										<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<polygon points="12 2 2 7 12 12 22 7 12 2"/>
											<polyline points="2 17 12 22 22 17"/>
											<polyline points="2 12 12 17 22 12"/>
										</svg>
									{:else if card.icon === 'cpu'}
										<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-accent-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
											<rect x="9" y="9" width="6" height="6"/>
											<line x1="9" y1="1" x2="9" y2="4"/>
											<line x1="15" y1="1" x2="15" y2="4"/>
											<line x1="9" y1="20" x2="9" y2="23"/>
											<line x1="15" y1="20" x2="15" y2="23"/>
											<line x1="20" y1="9" x2="23" y2="9"/>
											<line x1="20" y1="14" x2="23" y2="14"/>
											<line x1="1" y1="9" x2="4" y2="9"/>
											<line x1="1" y1="14" x2="4" y2="14"/>
										</svg>
									{/if}
								</div>
								<p class="font-heading text-sm font-bold leading-none text-primary">
									{card.value}
								</p>
								<p class="mt-0.5 text-[10px] leading-tight text-muted">
									{card.label}
								</p>
							</div>
						{/each}
					</div>

					<!-- Panel Footer -->
					<div class="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
						<div class="flex items-center gap-1.5">
							<div class="h-1 w-1 rounded-full bg-accent-cyan animate-pulse-glow"></div>
							<span class="text-[10px] text-muted">
								ryan.engineer.sys
							</span>
						</div>
						<span class="text-[10px] tabular-nums text-muted/70">
							v1.0.0 stable
						</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Scroll indicator -->
		<div
			class="mt-8 flex justify-center pb-8 lg:mt-12 transition-all duration-700 delay-700 {isVisible
				? 'translate-y-0 opacity-100'
				: 'translate-y-4 opacity-0'}"
		>
			<a
				href="#about"
				class="group flex flex-col items-center gap-2 text-muted transition-colors duration-300 hover:text-accent-cyan"
			>
				<span class="text-[11px] tracking-[0.15em] uppercase">Scroll</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 animate-bounce"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="6 9 12 15 18 9" />
				</svg>
			</a>
		</div>
	</div>
</section>
