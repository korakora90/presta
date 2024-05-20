<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */

declare(strict_types=1);

namespace PrestaShop\Module\PsxDesign\Factory\ThemeConfiguration;

if (!defined('_PS_VERSION_')) {
    exit;
}

use Hook;
use PrestaShop\Module\PsxDesign\DTO\ThemeConfiguration\PsxDesignThemeConfiguration;

class AbstractThemeConfigurationFactory
{
    /**
     * @var PsxDesignThemeConfiguration|null
     */
    protected $configurations;

    /**
     * @var string
     */
    protected $themeName;

    protected function __construct(string $themeName)
    {
        $this->themeName = $themeName;
        $this->setThemeConfigurations($themeName);
    }

    /**
     * @param string $themeName
     *
     * @return void
     */
    protected function setThemeConfigurations(string $themeName): void
    {
        if ($this->configurations) {
            return;
        }

        $configurations = Hook::exec('actionThemeConfiguration', [], null, true);

        foreach ($configurations as $config) {
            if (isset($config['theme']) && $config['theme'] === $themeName) {
                $this->configurations = PsxDesignThemeConfiguration::createFromThemeConfiguration($config);
            }
        }
    }

    /**
     * @param string $themeName
     *
     * @return void
     */
    protected function setNewTheme(string $themeName): void
    {
        $this->themeName = $themeName;
        $this->refreshHook();
    }

    /**
     * @return void
     */
    private function refreshHook(): void
    {
        $this->configurations = null;
        $this->setThemeConfigurations($this->themeName);
    }
}
