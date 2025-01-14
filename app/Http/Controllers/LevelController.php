<?php

namespace App\Http\Controllers;

use App\Models\Circle;
use App\Models\Level;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class LevelController extends Controller
{
  public function circlesWithLevelIds()
  {
    return Circle::with('levels')
      ->get()
      ->map(fn ($circle) => [
        'id' => $circle->id,
        'name' => $circle->name,
        'levels' => $circle->levels->map(fn ($lvl) => $lvl->id)
      ]);
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return Inertia::render('admin/levels', [
      'levels' => Level::all(),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    Level::create(
      request()->validate([
        'question' => 'required',
        'answer' => 'required',
        'points' => 'required',
        'source_hint' => 'nullable',
        'is_story' => 'required'
      ])
    );

    return Redirect::route('levels.index');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Level  $level
   * @return \Illuminate\Http\Response
   */
  public function show(Level $level)
  {
    return Inertia::render('admin/level', [
      'level' => Level::where('id', $level->id)
        ->withCount(['users', 'attempts', 'solves'])
        ->first(),
      'levels' => Level::all(),
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Level  $level
   * @return \Illuminate\Http\Response
   */
  public function edit(Level $level)
  {
    return Inertia::render('admin/level', ['level' => $level]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Level  $level
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Level $level)
  {
    $request->validate([
      'question' => 'required',
      'answer' => 'nullable',
      'points' => 'required',
      'source_hint' => 'nullable',
    ]);
    $level->question = $request->question;
    $level->answer = $request->answer;
    $level->points = $request->points;
    $level->source_hint = $request->source_hint;
    $level->save();

    return redirect()->back();
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Level  $level
   * @return \Illuminate\Http\Response
   */
  public function destroy(Level $level)
  {
    $level->delete();
    return Redirect::route('levels.index');
  }
}
