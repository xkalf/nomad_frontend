<script lang="ts">
	import { page } from '$app/stores'

	function getIconColor(route: string) {
		if (route === $page.route.id) {
			return '1'
		} else {
			return '0.5'
		}
	}
</script>

<div class="hidden max-h-screen flex-col overflow-hidden bg-sidebarBg p-6 md:flex">
	<div class="flex justify-between py-4 text-white">
		<p class="lowercase">{$page.data.user.email}</p>
		<form action="/logout" method="POST">
			<button type="submit">Гарах</button>
		</form>
	</div>
	<div class="flex justify-between">
		<div class="flex h-14 w-14 items-center justify-center rounded-lg bg-black">
			<a data-sveltekit-preload-data href="/">
				<!-- Home -->
				<svg
					width="36"
					height="26"
					viewBox="0 0 36 26"
					fill="white"
					fill-opacity={getIconColor('/(app)')}
					preserveAspectRatio="xMidYMid"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M14.7981 0.709584C15.3519 0.379646 15.9681 0.168026 16.6078 0.0880658L17.024 0.0360382C17.4084 -0.0120128 17.7973 -0.0120127 18.1817 0.0360382L18.5749 0.0851915C19.2295 0.167005 19.8592 0.386633 20.4226 0.729591L29.3793 6.1815C30.359 6.77782 31.1963 7.5813 31.8325 8.53556L33.0119 10.3048C33.1449 10.5042 33.0019 10.7712 32.7623 10.7712H2.41269C2.1795 10.7712 2.03547 10.5168 2.15544 10.3169L3.07574 8.78302C3.74381 7.66958 4.67732 6.73899 5.79285 6.07442L14.7981 0.709584ZM2.72028 11.4717C2.22079 11.4717 1.7979 11.8403 1.72966 12.3351L1.02302 17.4582C0.940131 18.0592 1.40703 18.5949 2.01364 18.5949H11.165C11.7173 18.5949 12.165 18.1472 12.165 17.5949V14.4118C12.165 13.8595 12.6127 13.4118 13.165 13.4118H22.4638C23.0161 13.4118 23.4638 13.8595 23.4638 14.4118V17.5949C23.4638 18.1472 23.9115 18.5949 24.4638 18.5949H33.6151C34.2218 18.5949 34.6887 18.0592 34.6058 17.4582L33.8991 12.3351C33.8309 11.8403 33.408 11.4717 32.9085 11.4717H2.72028ZM0.520889 20.2214C0.577159 19.715 1.00522 19.3318 1.51477 19.3318H11.1641C11.7164 19.3318 12.1641 19.7795 12.1641 20.3318V24.9637C12.1641 25.516 11.7164 25.9637 11.1641 25.9637H1.00012C0.404106 25.9637 -0.0595836 25.4457 0.00623483 24.8533L0.520889 20.2214ZM35.1061 20.2214C35.0498 19.715 34.6218 19.3318 34.1122 19.3318H24.4629C23.9106 19.3318 23.4629 19.7795 23.4629 20.3318V24.9637C23.4629 25.516 23.9106 25.9637 24.4629 25.9637H34.6269C35.2229 25.9637 35.6866 25.4457 35.6208 24.8533L35.1061 20.2214ZM12.8911 14.7712C12.8911 14.4375 13.1616 14.1669 13.4954 14.1669H22.0895C22.4232 14.1669 22.6937 14.4375 22.6937 14.7712V24.8424C22.6937 25.4728 22.1827 25.9838 21.5523 25.9838H14.0325C13.4021 25.9838 12.8911 25.4728 12.8911 24.8424V14.7712ZM14.8382 16.5839C14.8382 16.3244 15.0486 16.1139 15.3082 16.1139H20.2767C20.5362 16.1139 20.7467 16.3244 20.7467 16.5839V23.5666C20.7467 23.8262 20.5362 24.0366 20.2767 24.0366H15.3082C15.0486 24.0366 14.8382 23.8262 14.8382 23.5666V16.5839Z"
					/>
				</svg>
			</a>
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg bg-black">
			<svg
				width="58"
				height="56"
				viewBox="-4 -4 58 56"
				fill="white"
				fill-opacity="0.5"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g filter="url(#filter0_dd_408_15185)">
					<path
						d="M39.4942 26.2H26.2339L35.065 35.0892C35.4025 35.429 35.958 35.4566 36.305 35.1275C38.4676 33.0766 39.9552 30.3119 40.3916 27.204C40.4665 26.6719 40.0278 26.2 39.4942 26.2ZM38.6096 22.5549C38.1491 15.8352 32.8146 10.4655 26.1389 10.002C25.6292 9.9666 25.2001 10.3992 25.2001 10.9133V23.4999H37.7048C38.2156 23.4999 38.6448 23.0679 38.6096 22.5549ZM22.5177 26.2V12.8523C22.5177 12.3151 22.0489 11.8735 21.5208 11.9489C14.8613 12.8961 9.77101 18.7524 10.0079 25.7708C10.2516 32.9787 16.4171 38.8895 23.5812 38.799C26.3976 38.7635 29.0001 37.85 31.1398 36.3223C31.5813 36.0073 31.6103 35.3531 31.2275 34.9677L22.5177 26.2Z"
					/>
				</g>
				<defs>
					<filter
						id="filter0_dd_408_15185"
						x="0.862059"
						y="0.862059"
						width="56.2011"
						height="54.6013"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB"
					>
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="3.76268" dy="3.76268" />
						<feGaussianBlur stdDeviation="6.45031" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_408_15185" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="-1.61258" dy="-1.61258" />
						<feGaussianBlur stdDeviation="3.22516" />
						<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0" />
						<feBlend
							mode="normal"
							in2="effect1_dropShadow_408_15185"
							result="effect2_dropShadow_408_15185"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect2_dropShadow_408_15185"
							result="shape"
						/>
					</filter>
				</defs>
			</svg>
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg bg-black">
			<svg
				width="56"
				height="56"
				viewBox="-3 -2 56 56"
				fill="white"
				fill-opacity="0.5"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g filter="url(#filter0_dd_408_15184)">
					<path
						d="M24.5 26.3125C29.0029 26.3125 32.6562 22.6592 32.6562 18.1562C32.6562 13.6533 29.0029 10 24.5 10C19.9971 10 16.3438 13.6533 16.3438 18.1562C16.3438 22.6592 19.9971 26.3125 24.5 26.3125ZM31.75 28.125H28.6291C27.3717 28.7027 25.9727 29.0312 24.5 29.0312C23.0273 29.0312 21.634 28.7027 20.3709 28.125H17.25C13.2455 28.125 10 31.3705 10 35.375V36.2812C10 37.7822 11.2178 39 12.7188 39H36.2812C37.7822 39 39 37.7822 39 36.2812V35.375C39 31.3705 35.7545 28.125 31.75 28.125Z"
					/>
				</g>
				<defs>
					<filter
						id="filter0_dd_408_15184"
						x="0.862059"
						y="0.862059"
						width="54.8012"
						height="54.8012"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB"
					>
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="3.76268" dy="3.76268" />
						<feGaussianBlur stdDeviation="6.45031" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_408_15184" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="-1.61258" dy="-1.61258" />
						<feGaussianBlur stdDeviation="3.22516" />
						<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0" />
						<feBlend
							mode="normal"
							in2="effect1_dropShadow_408_15184"
							result="effect2_dropShadow_408_15184"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect2_dropShadow_408_15184"
							result="shape"
						/>
					</filter>
				</defs>
			</svg>
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg bg-black">
			<a href="/settings/display">
				<svg
					width="70"
					height="70"
					viewBox="-6 -6 60 60"
					fill="none"
					stroke-opacity="0.5"
					stroke="white"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g filter="url(#filter0_dd_408_15181)">
						<path
							d="M11 19.8473V27.14C11 29.8195 11 29.8195 13.5278 31.5258L20.4793 35.545C21.5283 36.1517 23.2346 36.1517 24.271 35.545L31.2224 31.5258C33.7503 29.8195 33.7503 29.8195 33.7503 27.1527V19.8473C33.7503 17.1805 33.7503 17.1805 31.2224 15.4742L24.271 11.455C23.2346 10.8483 21.5283 10.8483 20.4793 11.455L13.5278 15.4742C11 17.1805 11 17.1805 11 19.8473Z"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M22.3747 27.2917C24.4688 27.2917 26.1664 25.5941 26.1664 23.5C26.1664 21.4059 24.4688 19.7083 22.3747 19.7083C20.2806 19.7083 18.583 21.4059 18.583 23.5C18.583 25.5941 20.2806 27.2917 22.3747 27.2917Z"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</g>
					<defs>
						<filter
							id="filter0_dd_408_15181"
							x="0.362059"
							y="0.362059"
							width="51.5517"
							height="53.8012"
							filterUnits="userSpaceOnUse"
							color-interpolation-filters="sRGB"
						>
							<feFlood flood-opacity="0" result="BackgroundImageFix" />
							<feColorMatrix
								in="SourceAlpha"
								type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
								result="hardAlpha"
							/>
							<feOffset dx="3.76268" dy="3.76268" />
							<feGaussianBlur stdDeviation="6.45031" />
							<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" />
							<feBlend
								mode="normal"
								in2="BackgroundImageFix"
								result="effect1_dropShadow_408_15181"
							/>
							<feColorMatrix
								in="SourceAlpha"
								type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
								result="hardAlpha"
							/>
							<feOffset dx="-1.61258" dy="-1.61258" />
							<feGaussianBlur stdDeviation="3.22516" />
							<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0" />
							<feBlend
								mode="normal"
								in2="effect1_dropShadow_408_15181"
								result="effect2_dropShadow_408_15181"
							/>
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="effect2_dropShadow_408_15181"
								result="shape"
							/>
						</filter>
					</defs>
				</svg>
			</a>
		</div>
	</div>
	<slot />
</div>
