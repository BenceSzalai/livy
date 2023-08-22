import type { LogLevel } from '@livy/contracts';
import { Mixin } from '../mixin.js';
/**
 * Implements a level-respecting `isHandling` method
 */
export declare const RespectLevelMixin: Mixin.Wrapper<{
    new (...args: any[]): {
        /**
         * The minimum activation level for this handler
         */
        level: LogLevel;
        /**
         * @inheritdoc
         */
        isHandling(level: LogLevel): boolean;
    };
}, []>;
