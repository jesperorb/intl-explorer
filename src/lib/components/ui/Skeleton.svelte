<div class="skeleton"></div>

<style>
	.skeleton {
		width: 100%;
		display: inline-block;
		min-height: 2.5rem;
		border-radius: 4px;
		position: relative;
		overflow: hidden;
		background-color: #dddbdd;

		&::after {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			transform: translateX(-100%);
			background-image: linear-gradient(
				90deg,
				rgba(#fff, 0) 0,
				rgba(#fff, 0.2) 20%,
				rgba(#fff, 0.5) 60%,
				rgba(#fff, 0)
			);
			animation: shimmer 5s infinite;
			content: "";
		}

		@keyframes shimmer {
			100% {
				transform: translateX(100%);
			}
		}
	}
</style>
