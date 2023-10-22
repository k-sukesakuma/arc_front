export const initialData = {
	trial: {
		chapters: [
			{ name: '操作に慣れてみよう!' },
			{ name: 'allメソッドを使ってみよう!' },
			{ name: 'find_byメソッドを使ってみよう!' },
			{ name: '他のデータも取得してみよう!' },
			{ name: 'whereメソッドを使ってみよう!' },
		],
		description: '操作に慣れてみよう!',
	},
	basic: {
		chapters: [
			{ name: 'current_userの投稿を取得する' },
			{ name: 'current_userのコメントを取得する' },
			{ name: 'current_userが投稿した特定のタイトルの投稿を取得する' },
			{ name: 'current_userがコメントした特定の内容のコメントを取得する' },
			{ name: 'current_userがコメントした投稿を取得する' },
			{ name: 'current_userの投稿数を取得する' },
			{ name: 'current_userがいいねした特定の投稿を取得する' },
			{ name: 'current_userのコメント数を取得する' },
			{ name: 'current_userのいいね数を取得する' },
			{ name: 'current_userの特定の内容の投稿を取得する' },
		],
		description: 'current_userを使ってデータを取得してみよう!',
	},
	intermediate: {
		chapters: [
			{ name: 'current_userがコメントした全てのユーザーを取得する' },
			{
				name: 'current_userがコメントした投稿の中で最も多くいいねされたものを取得する',
			},
			{
				name: 'current_userがいいねした全ての投稿の中で最も多くコメントされたものを取得する',
			},
			{ name: 'current_userの投稿に紐づくカテゴリを全て取得する' },
			{ name: 'current_userの投稿に紐づくタグを全て取得する' },
			{ name: 'current_userの投稿に紐づくタグ数を取得する' },
			{ name: 'current_userの投稿に紐づくカテゴリ数を取得する' },
			{ name: 'current_userがコメントした投稿に紐づくタグを全て取得する' },
			{ name: 'current_userがいいねした投稿に紐づくカテゴリを全て取得する' },
			{
				name: 'current_userがコメントした投稿の中で特定のタグが付けられた投稿をすべて取得する',
			},
		],
		description: 'current_userを使って複雑なデータを取得してみよう!',
	},
	advanced: {
		chapters: [
			{
				name: 'current_userがフォローしているユーザーが投稿した投稿の中で、最も多くの「いいね」が付けられている投稿を取得する',
			},
			{
				name: 'current_userがフォローしているユーザーの中で、最も多くの投稿を持つユーザーを取得する',
			},
			{
				name: 'current_userがフォローしているユーザーの中で、最も多くの投稿を「いいね」したユーザーを取得する',
			},
			{
				name: 'current_userがフォローしているユーザーが投稿した投稿の中で、最も多くのタグが付けられている投稿を取得する',
			},
			{
				name: 'current_userがフォローしているユーザーの中で、最も多くのコメントを持つユーザーを取得する',
			},
		],
		description: '複数テーブルの複雑な条件でデータを取得してみよう!',
	},
};
