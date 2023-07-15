<template>
	<div class="empty-wrap">
		<img class="empty-img" :src="emptyImg"/>
		<p class="empty-text">{{text}}</p>
	</div>
</template>

<script>
import emptyImg from '@assets/img/empty-page.png'

export default {
	name: 'EmptyPage',
	props: {
		text: {type: String, required: false, default: ''},
	},
	data() {
		return {
			emptyImg: emptyImg
		}
	},
};
</script>

<style scoped lang="less">
	.empty-wrap {
		margin-top: 2rem;
		text-align: center;
		filter: grayscale(100%);
	}
	.empty-img {
		width: 2.3rem;
		

	}
	.empty-text {
		margin-top: .1rem;
		font-size: .3rem;
		color: #999;
	}
</style>
