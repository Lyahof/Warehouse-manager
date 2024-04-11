import supabase from "./supabase";

export async function signup({email, password, fullName}){
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: ''
			}
		}
	})
	if(error)
	throw new Error(error.message)

	return data;
}

export async function login({email, password}){
	const { data, error } = await supabase
		.auth
		.signInWithPassword({email,password})

	if(error)
		throw new Error(error.message)

	return data;
}

export async function getCurrentUser(){
	// getSession извлекает текущий сеанс из local storage.
	const {data: session} = await supabase
		.auth
		.getSession();
	if(!session.session) return null;

	// getUser выполняет сетевой запрос к серверу Supabase Auth, возвращаемое значение является подлинным 
	// и может использоваться для создания правил авторизации.
	const {data, error} = await supabase
		.auth
		.getUser();
	if(error) throw new Error(error.message)
	
	return data?.user;
}

export async function logout(){
	const {error} = await supabase
		.auth
		.signOut()
	if(error) throw new Error(error.message)
}

export async function updateCurrentUser({avatar, password, fullName}){
	// 1. Обновить пароль ИЛИ имя
	let updateData;
	if (password) updateData = { password };
	if (fullName) updateData = { data: { fullName } };
 
	const { data, error } = await supabase.auth.updateUser(updateData);
 
	if (error) throw new Error(error.message);
	if (!avatar) return data;
 
	// 2. Загрузить аватарку
	const fileName = `avatar-${data.user.id}-${Math.random()}`;
 
	const { error: storageError } = await supabase.storage
		.from("avatars")
		.upload(fileName, avatar);
 
	if (storageError) throw new Error(storageError.message);
 
	// 3. Обновить аватар в таблице user
	const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
		data: {
			avatar: `https://dfrhtfajysbbpzsmungw.supabase.co/storage/v1/object/public/avatars/${fileName}`,
		},
	});
 
	if (error2) throw new Error(error2.message);
	return updatedUser;
}