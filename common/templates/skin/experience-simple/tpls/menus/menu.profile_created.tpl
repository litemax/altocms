 {* Тема оформления Experience v.1.0  для Alto CMS      *}
 {* @licence     CC Attribution-ShareAlike  http://site.creatime.org/experience/*}

<div class="row">
    <div class="col-lg-24 mab12">

        <a href="{$oUserProfile->getProfileUrl()}created/topics/"
           class="btn btn-default {if $sMenuSubItemSelect=='topics'}active{/if}">
            {$aLang.topic_title}  {if $iCountTopicUser} ({$iCountTopicUser}) {/if}
        </a>


        <a class="btn btn-default {if $sMenuSubItemSelect=='photos'}active{/if}"
           href="{$oUserProfile->getProfileUrl()}created/photos/">{$aLang.user_menu_publication_photos}  {if $iPhotoCount} ({$iPhotoCount}) {/if}</a>

        <a class="btn btn-default {if $sMenuSubItemSelect=='comments'}active{/if}"
           href="{$oUserProfile->getProfileUrl()}created/comments/">{$aLang.user_menu_publication_comment}  {if $iCountCommentUser} ({$iCountCommentUser}) {/if}</a>

        {if E::UserId()==$oUserProfile->getId()}
            <a class="btn btn-default {if $sMenuSubItemSelect=='notes'}active{/if}"
               href="{$oUserProfile->getProfileUrl()}created/notes/">{$aLang.user_menu_profile_notes}  {if $iCountNoteUser} ({$iCountNoteUser}) {/if}</a>
        {/if}

        {hook run='menu_profile_created_item' oUserProfile=$oUserProfile}
    </div>
    {hook run='menu_profile_created' oUserProfile=$oUserProfile}
</div>