<?php

namespace App\Traits;

use App\Http\Models\Admin\Role;
use App\Http\Models\Vuex\Settings\ManageBlock;
use Illuminate\Support\Facades\Schema;

trait VuexAutoMethods
{


    public function vuex(){
        $func = request('func');
        $payload = request('payload') ?? '';
        return call_user_func_array([__CLASS__,$func],[$payload]);
    }

    public function columns($table): array
    {
        return Schema::getColumnListing($table);
    }

    /**
     * Автоматически возвращает только поля модели -> исключает связи и примеси
     * @param $table
     * @param $data
     * @return array
     */
    public function autoDTO($table, $data, $full = false): array
    {
        $restricted = ['id','created_at','updated_at','deleted_at'];
        $columns = $this->columns($table);
        $arrResult = [];
        if ($full) {
            foreach ((array)$data as $key => $value) if(in_array($key,$columns)) {
                $arrResult[$key] = $value;
            }
        } else {
            foreach ((array)$data as $key => $value) if(in_array($key,$columns) && !in_array($key, $restricted)) {
                $arrResult[$key] = $value;
            }
        }
        return $arrResult;
    }

    public function settings(): array
    {
        $user = \auth()->guard('admin')->user();
        $classname = (new \ReflectionClass($this))->getShortName();
        return [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'role_id' => $user->roles()->first()->id,
                'role_name' => $user->roles()->first()->name
            ],
            'roles' => Role::select(['id','name','slug'])->get(),
            'namespace' => $classname,
            'manage' => $this->manageBlocks($classname)
        ];
    }

    private function manageBlocks($namespace = null)
    {
        return ManageBlock::with(['items.listItems'])
            ->where('namespace', $namespace ?? request('namespace'))->get();
    }
}
