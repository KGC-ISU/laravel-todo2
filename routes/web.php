<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'MainController@index');

Route::get('/data', 'MainController@getData')->middleware('login');
Route::get('/check', 'UserController@loginStatus');

Route::post('/login', 'UserController@login');
Route::get('/logout', 'UserController@logout')->middleware('login');    //로그인한 사용자만 접근 가능

Route::get('/todo', 'TodoController@getTodoList')->middleware('login'); //로그인한 사용자만 접근 가능
Route::post('/todo', 'TodoController@postTodo')->middleware('login');    //로그인한 사용자만 접근 가능
Route::post('/comTodo', 'TodoController@comTodo')->middleware('login');    //로그인한 사용자만 접근 가능
Route::post('/delTodo', 'TodoController@delTodo')->middleware('login');    //로그인한 사용자만 접근 가능
