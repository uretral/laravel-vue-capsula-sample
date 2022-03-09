<?php

namespace App\Http\Models\Common;

use App\Http\Classes\Common;
use App\Http\Controllers\Classes\AmoCrm;
use App\Http\Filters\Filter;
use App\Http\Filters\Leads\LeadQueryBuilder;
use App\Http\Filters\VuexFilter;
use App\Http\Models\Admin\AdminUser;
use App\Http\Models\Admin\CustomRevisionableTrait;
use App\Http\Models\AdminClient\Client;
use App\Http\Models\AdminClient\Questionnaire;
use App\Http\Models\Catalog\Note;
use App\Http\Models\Catalog\Tags;
use App\Mail\StylistNotify;
use App\Mail\Test;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Http\Models\Common\BonusTransactions;
use Spatie\Backtrace\Backtrace;
use Venturecraft\Revisionable\RevisionableTrait;
use Illuminate\Support\Facades\Log;


/**
 * Class Lead
 *
 * @package App\Http\Models\Common
 * @property string $uuid
 * @property string|null $client_id
 * @property int|null $stylist_id
 * @property int|null $amo_lead_id
 * @property int|null $anketa_id
 * @property string|null $anketa_uuid
 * @property float|null $total
 * @property float|null $summ
 * @property float|null $discount
 * @property int|null $state_logistic
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $state_id
 * @property int|null $substate_id
 * @property string|null $description
 * @property string|null $tag
 * @property array|null $data
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property int|null $client_num
 * @property int|null $amo_link_contact_id
 * @property string|null $deadline_at
 * @property string|null $delivery_at
 * @property string|null $create_type
 * @property-read \App\Http\Models\AdminClient\Questionnaire|null $ankets
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Http\Models\Common\BonusTransactions[] $bonus_transactions
 * @property-read int|null $bonus_transactions_count
 * @property-read \App\Http\Models\AdminClient\Client|null $clients
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Http\Models\Common\Delivery[] $delivery
 * @property-read int|null $delivery_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Http\Models\Common\Payments[] $hasPayments
 * @property-read int|null $has_payments_count
 * @property-read \App\Http\Models\Common\Payments $payments
 * @property-read \App\Http\Models\AdminClient\Questionnaire|null $questionnaire
 * @property-read \App\Http\Models\Common\LeadRef|null $states
 * @property-read \App\Http\Models\Admin\AdminUser|null $stylists
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead filter(\App\Http\Filters\Filter $filters)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Http\Models\Common\Lead onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereAmoLeadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereAmoLinkContactId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereAnketaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereAnketaUuid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereClientNum($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereCreateType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereDeadlineAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereDeliveryAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereStateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereStateLogistic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereStylistId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereSubstateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereSumm($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereTag($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereUuid($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Http\Models\Common\Lead withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Http\Models\Common\Lead withoutTrashed()
 * @mixin \Eloquent
 * @property string $source
 * @property-read \App\Http\Models\Common\DoliTransactions|null $doli
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Http\Models\Common\LeadCorrections[] $leadCorrections
 * @property-read int|null $lead_corrections_count
 * @property-read \Illuminate\Database\Eloquent\Collection|Note[] $notes
 * @property-read int|null $notes_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Http\Models\Admin\CustomRevision[] $revisionHistory
 * @property-read int|null $revision_history_count
 * @property-read \Illuminate\Database\Eloquent\Collection|Tags[] $tags
 * @property-read int|null $tags_count
 * @property-read AdminUser $userResponsible
 * @method static Builder|Lead whereSource($value)
 * @property int|null $state
 * @property-read \App\Http\Models\AdminClient\Client|null $leadClient
 * @property-read \App\Http\Models\Common\LeadControl|null $leadControl
 * @property-read \App\Http\Models\Common\LeadRef|null $leadState
 * @property-read \App\Http\Models\Catalog\Tags|null $leadTag
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead filters(\App\Http\Filters\VuexFilter $filters)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Common\Lead whereState($value)
 */
class Lead extends Model
{
    use SoftDeletes, RevisionableTrait;


    protected $casts = [
        'data' => 'array'
    ];

    protected $fillable = ['client_id','amo_lead_id','anketa_id','total','state_id','anketa_uuid','client_num','create_type','date_delivery','tag','amo_link_contact_id'];



    // ******************** vuex ********************

    // встроенные методы

    /**
     * Реализует фильтрацию
     * @param $query
     * @return LeadQueryBuilder
     */
    public function newEloquentBuilder($query): LeadQueryBuilder
    {
        return new LeadQueryBuilder($query);
    }

    // relations

    public function leadClient(): HasOne
    {
        return $this->hasOne(Client::class, 'uuid', 'client_id');
    }

    public function leadState(): HasOne
    {
        return $this->hasOne(LeadRef::class, 'id', 'state_id');
    }

    public function leadTag(): HasOne
    {
        return $this->hasOne(Tags::class, 'name', 'tag');
    }

}
