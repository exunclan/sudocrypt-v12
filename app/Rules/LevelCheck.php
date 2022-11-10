<?php

namespace App\Rules;

use App\Models\Level;
use App\Models\UserAttempt;
use Illuminate\Contracts\Validation\Rule;

class LevelCheck implements Rule
{
  /**
   * Create a new rule instance.
   *
   * @return void
   */
  public function __construct()
  {
    //
  }

  public $is42 = false;

  /**
   * Determine if the validation rule passes.
   *
   * @param  string  $attribute
   * @param  mixed  $value
   * @return bool
   */
  public function passes($attribute, $value)
  {
    $answer = request()->user()->level->answer;

    if ($value === "42") {
      $this->is42 = true;
    }

    (new UserAttempt([
      'attempt' => $value,
      'user_id' => auth()->id(),
      'level_id' => auth()->user()->level->id,
      'correct' => $answer === $value,
      'ip' => request()->ip()
    ]))->save();
    return $answer === $value;
  }

  /**
   * Get the validation error message.
   *
   * @return string
   */
  public function message()
  {
    if ($this->is42 == true) {
      return "42 is not the answer to everything";
    } 
    return 'Not it';
  }
}
