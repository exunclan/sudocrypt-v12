<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Circle;
use App\Models\Level;
use App\Models\Notification;
use App\Models\UserAttempt;
use App\Rules\LevelCheck;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PlayController extends Controller
{
  public function show()
  {
    $hint = null;
    if (auth()->user()->level && auth()->user()->level->source_hint) {
      $hint = auth()->user()->level->source_hint;
    }
    return Inertia::render('play', [
      'hint' => $hint,
      // 'completed_levels' => UserAttempt::select('level_id as id')
      //   ->where('correct', true)
      //   ->where('user_id', auth()->id())
      //   ->get()
      //   ->map(fn ($lvl) => $lvl->id),
      'notifications' => Notification::orderBy('created_at', 'DESC')->get(),
      'error' => null,
      'levels' => Level::select('id', 'question', 'is_story')->get()->map(function ($level) {
        return [
          'id' => $level->id,
          'is_story' => $level->is_story,
          'is_completed' => $level->id < auth()->user()->level_id,
          'is_current_level' => $level->id == auth()->user()->level_id,
        ];
      }),
      'previous_stories' => Level::where('is_story', true)->where('id', '<', auth()->user()->level_id)->get()->map(function ($level) {
        return [
          'id' => $level->id,
          'question' => $level->question,
        ];
      })
    ]);
  }

  public function attempt(Request $request)
  {
    $user = User::find(auth()->id());
    $level = $user->level;

    if ($level->is_story) {
      (new UserAttempt([
        'attempt' => '',
        'user_id' => auth()->id(),
        'level_id' => auth()->user()->level->id,
        'correct' => true,
        'ip' => request()->ip()
      ]))->save();
    } else {
      $request->validate([
        'attempt' => [
          "regex:/^[a-z0-9-_{}:()|&;@#ʻ]+$/",
          new LevelCheck
        ]
      ]);
    }


    // $completedLevels = collect($user->attempts()
    //   ->where('correct', true)
    //   ->select('level_id as id')
    //   ->get()
    //   ->map(fn ($l) => $l->id));
    // $allLevelsSolved = Level::all()->levels->every(fn ($lvl) => $completedLevels->contains($lvl->id));

    // Answer is correct
    // Update points
    // Update last solved
    // Set level_id = null
    // Check if all levels in circle are solved
    //   If yes, move to next circle

    // if ($user->circle_id === 3 || $user->circle_id === 8) { // Circle is Desire and Violence, therefore dynamic pointing
    //   $numberOfUsersDoneWithLevel = UserAttempt::where('level_id', $user->level_id)->where('correct', true)->count();
    //   if ($numberOfUsersDoneWithLevel >= 6) { // 6 because we've already created a UserAttempt for this guy
    //     $user->points = $user->points + ((5 / 6) * $level->points * M_E ** (-0.012 * ($numberOfUsersDoneWithLevel - 5)) + ($level->points / 6));
    //   } else {
    //     $user->points = $user->points + $level->points;
    //   }
    // } else {
      $user->points = $user->points + $level->points;
    // }
    $user->last_solved = now();
    $user->level_id = $level->id + 1;
    // if ($allLevelsSolved) {
    //   $nextCircle = Circle::find($user->circle_id + 1);
    //   if ($nextCircle) {
    //     $user->circle_id = $nextCircle->id;
    //   } else {
    //     $user->circle_id = null;
    //   }
    // }
    $user->save();

    return redirect()->route('play.show');
  }

  public function chooseLevel(Request $request)
  {
    if (!auth()->user()->level_id) {
      $request->validate([
        'level_id' => ['required', 'regex:/\d{1}/']
      ]);

      $userAttemptDone = UserAttempt::where('user_id', auth()->id())->where('level_id', $request->level_id)->where('correct', true)->first();
      if ($userAttemptDone) {
        return redirect()->route('play.show');
      }

      $user = User::find(auth()->id());

      $levels = collect(
        Level::where('circle_id', $user->circle_id)
          ->select('id')
          ->get()
          ->map(fn ($l) => $l->id)
      );
      if ($levels->contains($request->level_id)) {
        $user->level_id = $request->level_id;
        $user->save();
      }
    }

    return redirect()->to('/play');
  }
}
