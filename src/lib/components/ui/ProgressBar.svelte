<div class="progress-bar"></div>

<style>
	.progress-bar {
		position: absolute;
		top: 0;
		left: 0;
		height: 4px;
		width: 100%;
		display: block;
		background-color: var(--progress-bar-color);
		background-image: linear-gradient(
			-45deg,
			rgba(255, 255, 255, 0.2) 25%,
			transparent 25%,
			transparent 50%,
			rgba(255, 255, 255, 0.2) 50%,
			rgba(255, 255, 255, 0.2) 75%,
			transparent 75%,
			transparent 100%
		);
		animation: move 2s linear infinite;
	}

	@keyframes move {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 500px 500px;
		}
	}
</style>
