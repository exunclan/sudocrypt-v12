<?php

namespace App\Http\Middleware;

use App\Models\Level;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
  /**
   * The root template that's loaded on the first page visit.
   *
   * @see https://inertiajs.com/server-side-setup#root-template
   * @var string
   */
  protected $rootView = 'app';

  /**
   * Determines the current asset version.
   *
   * @see https://inertiajs.com/asset-versioning
   * @param  \Illuminate\Http\Request  $request
   * @return string|null
   */
  public function version(Request $request)
  {
    return parent::version($request);
  }

  /**
   * Defines the props that are shared by default.
   *
   * @see https://inertiajs.com/shared-data
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function share(Request $request)
  {
    return array_merge(parent::share($request), [
      'dates' => [
        'start' => env('START_TIME'),
        'end' => env('END_TIME')
      ],
      'started' => \Carbon\Carbon::parse(env('START_TIME'))
        ->lt(\Carbon\Carbon::now('Asia/Kolkata')),
      'ended' => \Carbon\Carbon::parse(env('END_TIME'))
        ->lt(\Carbon\Carbon::now('Asia/Kolkata')),
      'auth.authenticated' => fn () => Auth::check(),
      'auth.user' => fn () => Auth::check()
        ? $request->user()->only(
          'id',
          'username',
          'email',
          'name',
          'institution',
          'discord_id',
          'discord_username',
          'discord_discriminator',
          'discord_image',
          'admin',
          'disqualified',
          'points',
          'level_id',
          'last_active',
          'last_solved'
        )
        : null,
      'auth.user.level' => fn () => (Auth::check() && $request->user()->level_id !== null) ? $request->user()->level->only(
        'question',
        'source_hint',
        'points',
        'id',
        'created_at',
        'updated_at',
        'is_story'
      ) : null,
      'authenticated' => Auth::check(),
      'flash' => [
        'error' => fn () => $request->session()->get('error'),
        'message' => fn () => $request->session()->get('message'),
      ],
    ]);
  }
}
