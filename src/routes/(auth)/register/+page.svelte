<form action="?/register" method="post" class="bg-[#111826] p-4">
	<div class="mb-6">
		<label for="email" class="mb-2 block text-sm font-medium text-white">Имэйл хаяг</label>
		<input
			type="email"
			id="email"
			name="email"
			class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
			placeholder="name@flowbite.com"
			required
		/>
	</div>
	<div class="mb-6">
		<label for="password" class="mb-2 block text-sm font-medium text-white">Нууц үг</label>
		<input
			type="password"
			id="password"
			name="password"
			class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
			required
		/>
	</div>
	<div class="mb-6">
		<label for="lastname" class="mb-2 block text-sm font-medium text-white">Овог</label>
		<input
			type="text"
			id="lastname"
			name="lastname"
			class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
			required
		/>
	</div>
	<div class="mb-6">
		<label for="firstname" class="mb-2 block text-sm font-medium text-white">Нэр</label>
		<input
			type="text"
			id="firstname"
			name="firstname"
			class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
			required
		/>
	</div>
	<div class="mb-6">
		<label for="birthdate" class="mb-2 block text-sm font-medium text-white">Төрсөн өдөр</label>
		<input
			type="date"
			id="birthdate"
			name="birthdate"
			class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
			required
		/>
	</div>
	<!-- <div class="mb-6">
		<label for="gender" class="block mb-2 text-sm font-medium text-white"
			>Хүйс</label
		>
		<select
			id="gender"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			required
		>
			<option value="male">Эрэгтэй</option>
			<option value="female">Эмэгтэй</option>
		</select>
	</div> -->
	<button
		type="submit"
		class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
		>Submit</button
	>
</form>
