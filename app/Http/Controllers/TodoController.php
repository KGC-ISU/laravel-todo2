<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TodoController extends Controller
{
    public function postTodo(Request $req)
    {
        $data = $req->only('name', 'date');
        $result = auth()->user()->todo()->create($data);  //로그인 된 유저의 데이터값으로 컬럼생성
        return response()->json(['success'=>true, 'result'=>$result]);
    }

    public function getTodoList(Request $req)
    {
        $list = auth()->user()->todo()->get();
        return response()->json(['success'=>true, 'list'=>$list]);
    }

    public function comTodo(Request $req)
    {
        $id = $req->input('id');
        DB::table('todos')->where('id', '=', $id)->update(['complete'=>1]);

        return response()->json(['success'=>true, 'id'=>$id]);
    }

    public function delTodo(Request $req)
    {
        $id = $req->input('id');
        DB::table('todos')->where('id', '=', $id)->delete();

        return response()->json(['success'=>true, 'id'=>$id]);
    }
}
