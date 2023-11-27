<?php

namespace Site;

enum HookManagerStates: int {
    case ORDER_CREATED = 100;
    case ORDER_PAID = 101;
    case ORDER_CANCELED = 102;
    case GAS_DISPERSED = 103;
    case TEST_HOOK = 104;
    case PAYOUT_DONE = 105;
    case PAYOUT_CREATED = 106;
    case PAYOUT_CANCELLED = 107;
    case CUSTOMER_DELETED = 108;
    case ITEM_DELETED = 109;

    public function label(): string {
        return static::getLabel($this);
    }
    
    public static function getLabel(self $value): string {
        return match ($value) {
            HookManagerStates::ORDER_CREATED => 'ORDER_CREATED',
            HookManagerStates::ORDER_PAID => 'ORDER_PAID',
            HookManagerStates::ORDER_CANCELED => 'ORDER_CANCELED',
            HookManagerStates::TEST_HOOK => 'TEST_HOOK',
            HookManagerStates::PAYOUT_DONE => 'PAYOUT_DONE',
            HookManagerStates::PAYOUT_CREATED => 'PAYOUT_CREATED',
            HookManagerStates::PAYOUT_CANCELLED => 'PAYOUT_CANCELLED',
            HookManagerStates::CUSTOMER_DELETED => 'CUSTOMER_DELETED',
            HookManagerStates::ITEM_DELETED => 'ITEM_DELETED',
        };
    }
}